from .models import Intereses, Usuarios, InteresesUsuarios, OfertasDisponibles, categorias, Empresas, OfertasEmpresas, Postulaciones, OfertasDesactivadas, relacion_OfertasDesact
from rest_framework import serializers

class InteresesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intereses
        fields = '__all__'
        
    def validate_nombre(self,value):
        if len(value) <= 5:
            raise serializers.ValidationError("El nombre del autor tiene que tener mas de 5 caracteres")
        return value


class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

class InteresesUsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteresesUsuarios
        fields = '__all__'

class OfertasDisponiblesSerializer(serializers.Modelserializer):
    class Meta:
        model = OfertasDisponibles
        fields = '__all__'

class categoriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = categorias
        fields = '__all__'

class EmpresasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresas
        fields = '__all_'
        
class OfertasEmpresasSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfertasEmpresas
        fileds = '__all__'
        
class PostulacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulaciones
        fields = '__all__'
        
class OfertasDesactivadasSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfertasDesactivadas
        fields = '__all_'
        
class relacion_OfertasDesactSerializer(serializers.ModelSerializer):
    class Meta:
        model = relacion_OfertasDesact
        fields = '__all__'