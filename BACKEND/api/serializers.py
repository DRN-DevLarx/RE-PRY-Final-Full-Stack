from rest_framework import serializers
from django.core.validators import RegexValidator
from .models import Usuarios, Intereses, InteresesUsuarios, Users_Usuarios,  Ofertas, Empresas, Postulaciones, AuditoriaOfertas, Users_Empresas
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


UserGroup = User.groups.through

class InteresesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intereses
        fields = "__all__"


class UsuariosSerializer(serializers.ModelSerializer):
    telefono_oferente = serializers.CharField(max_length=20, allow_null=True, allow_blank=True, validators=[RegexValidator(regex=r'^\d{8,12}$', message="Debe contener entre 8 y 12 dígitos numéricos.")]
    )

    class Meta:
        model = Usuarios
        fields = "__all__"


class InteresesUsuariosSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = InteresesUsuarios
        fields = "__all__"

class Users_UsuariosSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Users_Usuarios
        fields = "__all__"

class user_groupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGroup
        fields = "__all__"

class UsersSerializer(serializers.ModelSerializer):
    # groups = user_groupsSerializer(many=True)

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}

    # def validate(self, attrs):
    #     data = super().validate(attrs)
    #     # Obtener el grupo del usuario (rol)
    #     groups = self.user.groups.values_list('name', flat=True)
    #     data['role'] = groups[0] if groups else None
    #     return data
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        try:
            password = validated_data.pop('password', None)
            
            for attr, value in validated_data.items() :
                setattr(instance, attr, value)
                
            if password :
                instance.set_password(password)
            instance.save()
            return instance
        
        except Exception as e:
            print(f"Error al actualizar usuario: {e}") 
            raise serializers.ValidationError({"error": "No se pudo actualizar el usuario."})


class EmpresasSerializer(serializers.ModelSerializer):

    class Meta:
        model = Empresas
        fields = "__all__"

class Users_EmpresasSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Users_Empresas
        fields = "__all__"

class OfertasSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Ofertas
        fields = "__all__"
    
class PostulacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulaciones
        fields = "__all__"
     

class AuditoriaOfertasSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditoriaOfertas
        fields = "__all__"


    

class CustomTokenObtainPairSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError({
                "error_code": "invalid_credentials",
                "message": "Credenciales incorrectas."
            })

        if not user.check_password(password):
            raise serializers.ValidationError({
                "error_code": "invalid_credentials",
                "message": "Credenciales incorrectas."
            })

        # Si llegamos hasta acá, el usuario es válido (activo o no)
        refresh = RefreshToken.for_user(user)

        groups = user.groups.values_list('name', flat=True)

        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user_id': user.id,
            'role': groups[0] if groups else None,
            'is_active': user.is_active
        }


