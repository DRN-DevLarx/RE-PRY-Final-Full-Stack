from rest_framework import serializers
from django.core.validators import MinLengthValidator, EmailValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password
from .models import Usuarios, Intereses, InteresesUsuarios, Users_Usuarios,  Ofertas, Empresas, OfertasEmpresas, Postulaciones, AuditoriaOfertas, Users_Empresas
from django.contrib.auth.models import User, Group
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class InteresesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intereses
        fields = "__all__"


class UsuariosSerializer(serializers.ModelSerializer):
    telefono_oferente = serializers.CharField(max_length=20, allow_null=True, allow_blank=True, validators=[RegexValidator(regex=r'^\d{8,12}$', message="Debe contener entre 8 y 12 dígitos numéricos.")]
    )
    # intereses = InteresesSerializer(many=True, write_only=True)
    # intereses_ids = serializers.PrimaryKeyRelatedField(queryset=Intereses.objects.all(), many=True, write_only=True, source="Intereses")

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
        model = User.groups.through
        fields = ["user", "group"]


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class EmpresasSerializer(serializers.ModelSerializer):

    class Meta:
        model = Empresas
        fields = "__all__"

class Users_EmpresasSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Users_Empresas
        fields = "__all__"

class OfertasSerializer(serializers.ModelSerializer):
    titulo_oferta = serializers.CharField(validators=[MinLengthValidator(3)])
    nombre_puesto_oferta = serializers.CharField(validators=[MinLengthValidator(3)])

    class Meta:
        model = Ofertas
        fields = "__all__"



class OfertasEmpresasSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfertasEmpresas
        fields = "__all__"

class PostulacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulaciones
        fields = "__all__"

class AuditoriaOfertasSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditoriaOfertas
        fields = "__all__"



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Obtener el grupo del usuario (rol)
        groups = self.user.groups.values_list('name', flat=True)

        # Agrega el primer grupo como 'role'
        data['role'] = groups[0] if groups else None
        
        #Id del usuaro
        data['user_id'] = self.user.id

        return data