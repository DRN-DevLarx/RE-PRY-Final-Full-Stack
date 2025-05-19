from django.db import models



class Autor (models.Model):
    nombre = models.CharField(max_length=100)
    nacionalidad = models.CharField(max_length=100, blank=True,null=True)
   
    def __str__(self):
        return self.nombre
    


class Categorias(models.Model):
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre



class Libros(models.Model):
    titulo = models.CharField(max_length=100)
    autor=models.ForeignKey(Autor,on_delete=models.CASCADE, related_name='libros')
    fecha_publicacion = models.DateField()
    disponible= models.BooleanField(default=True)
    categorias = models.ManyToManyField(Categorias, through='LibrosCategorias', related_name='libros')
   



    def __str__(self):
        return self.titulo
    

class LibrosCategorias(models.Model):
    libro = models.ForeignKey(Libros, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categorias, on_delete=models.CASCADE)
    relevancia = models.IntegerField(default=1)

 