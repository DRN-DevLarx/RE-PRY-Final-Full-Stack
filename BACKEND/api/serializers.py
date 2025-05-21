from .models import Intereses
from rest_framework import serializers

class InteresesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intereses
        fields = '__all__'
        
    def validate_nombre(self,value):
        if len(value) <= 5:
            raise serializers.ValidationError("El nombre del autor tiene que tener mas de 5 caracteres")
        return value
    




# class CategoriasSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Categorias
#         fields = ['id', 'nombre']  

# class LibrosCategoriasSerializer(serializers.ModelSerializer):
  
#     class Meta:
#         model = LibrosCategorias
#         fields = '__all__'

# class LibrosSerializer(serializers.ModelSerializer):


#     class Meta:
#         model = Libros
#         fields = ['id', 'titulo', 'fecha_publicacion', 'disponible', 'autor']
