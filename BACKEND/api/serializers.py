from rest_framework import serializers
from django.core.validators import MinLengthValidator, EmailValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password
from .models import Usuarios, Intereses, InteresesUsuarios, Ofertas, Empresas, OfertasEmpresas, Postulaciones, AuditoriaOfertas

class InteresesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intereses
        fields = "__all__"

class UsuariosSerializer(serializers.ModelSerializer):
    contrasena_oferente = serializers.CharField(
        max_length=30,
        write_only=True,  # Evita mostrar la contraseña en respuestas de la API
    )

    correo_oferente = serializers.EmailField(validators=[EmailValidator()])

    telefono_oferente = serializers.CharField(
        max_length=20,
        allow_null=True,
        allow_blank=True,
        validators=[RegexValidator(regex=r'^\d{8,12}$', message="Debe contener entre 8 y 12 dígitos numéricos.")]
    )

    nombre_oferente = serializers.CharField(
        max_length=30,
        validators=[MinLengthValidator(3), RegexValidator(regex=r'^[A-Za-z\s]+$', message="Solo letras y espacios permitidos.")]
    )

    apellido_oferente = serializers.CharField(
        max_length=30,
        validators=[MinLengthValidator(3), RegexValidator(regex=r'^[A-Za-z\s]+$', message="Solo letras y espacios permitidos.")]
    )

    intereses = serializers.PrimaryKeyRelatedField(queryset=Intereses.objects.all(), many=True)

    def validate_contrasena_oferente(self, value):
        validate_password(value)
        return value

    class Meta:
        model = Usuarios
        fields = "__all__"

class InteresesUsuariosSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuarios.objects.all())
    intereses = serializers.PrimaryKeyRelatedField(queryset=Intereses.objects.all())

    class Meta:
        model = InteresesUsuarios
        fields = "__all__"

class OfertasSerializer(serializers.ModelSerializer):
    titulo_oferta = serializers.CharField(validators=[MinLengthValidator(3)])
    nombre_puesto_oferta = serializers.CharField(validators=[MinLengthValidator(3)])

    class Meta:
        model = Ofertas
        fields = "__all__"

class EmpresasSerializer(serializers.ModelSerializer):
    contrasena_empresa = serializers.CharField(
        max_length=30,
        write_only=True,
        validators=[MinLengthValidator(8)]
    )

    nombre_empresa = serializers.CharField(
        max_length=30,
        validators=[MinLengthValidator(5)]
    )

    telefono_empresa = serializers.CharField(
        max_length=30,
        validators=[MinLengthValidator(8)]
    )

    correo_empresa = serializers.EmailField(validators=[EmailValidator()])

    class Meta:
        model = Empresas
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
