
from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator, EmailValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password

class Intereses(models.Model):
    nombre_interes = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.nombre_interes}"


class Usuarios (models.Model):
    identificacion_oferente = models.IntegerField(unique=True)
    telefono_oferente = models.CharField(unique=True, max_length=20, blank=True, null=True)
    referenciaIMG_oferente = models.CharField(max_length=30, blank=True, null=True)
    estado_oferente = models.CharField(max_length=30)
    
    intereses = models.ManyToManyField(Intereses, through='InteresesUsuarios', related_name='Usuarios')
    user_info = models.ManyToManyField(User, through='Users_Usuarios', related_name='Usuarios')

    def __str__(self):
        return f"Identificacion: {self.identificacion_oferente}, Estado: {self.estado_oferente}"  

    

class InteresesUsuarios(models.Model):
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    intereses = models.ForeignKey(Intereses, on_delete=models.CASCADE)

    def __str__(self):
        return f"usuario: + {self.usuario}, Interes: {self.intereses}"
    
###
    
class Users_Usuarios(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)

    def __str__(self):
        return f"user: + {self.user}, Usuario: + {self.usuario}"  



class Empresas(models.Model):
    identificacion_empresa = models.BigIntegerField(unique=True)
    telefono_empresa = models.CharField(max_length=30, validators=[MinLengthValidator(8)], unique=True,)
    direccion_empresa = models.TextField()
    referenciaIMG_empresa = models.CharField(max_length=30)
    estado_empresa = models.CharField(max_length=30)
    
    empresa_info = models.ManyToManyField(User, through='Users_Empresas', related_name='Empresas')

    def __str__(self):
        return f"Identificacion: {self.identificacion_empresa}, Estado: {self.estado_empresa}"  

    
class Users_Empresas(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    empresa = models.ForeignKey(Empresas, on_delete=models.CASCADE)

    def __str__(self):
        return f"user: + {self.user}, Usuario: + {self.empresa}"  

class Ofertas(models.Model):
    titulo_oferta = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    nombre_puesto_oferta = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    intereses = models.ForeignKey(Intereses, on_delete=models.CASCADE)
    vacantes_oferta = models.IntegerField()
    ubicacion_oferta = models.CharField(max_length=30)
    fecha_oferta = models.DateTimeField(auto_now_add=True)
    salario_oferta = models.CharField(max_length=30)
    descripcion_oferta = models.TextField()
    referenciaIMG_oferta = models.CharField(max_length=30)
    estado_oferta = models.CharField(max_length=30)
    empresa = models.ForeignKey(Empresas, on_delete=models.CASCADE)
    
    def __str__(self):
        return " ".join(vars(self).values())


class OfertasEmpresas(models.Model):
    Ofertas_empresa_ID = models.IntegerField(primary_key=True)
    oferta = models.ForeignKey(Ofertas, on_delete=models.CASCADE)
    empresa = models.ForeignKey(Empresas, on_delete=models.CASCADE)
    
    def __str__(self):
        return " ".join(vars(self).values())


class Postulaciones(models.Model):
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    oferta = models.ForeignKey(Ofertas, on_delete=models.CASCADE)
    fecha_postulacion =models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return " ".join(vars(self).values())
    
    
class AuditoriaOfertas(models.Model):
    oferta = models.ForeignKey(Ofertas, on_delete=models.CASCADE)
    motivo = models.TextField()
    fecha_auditoria = models.DateTimeField (auto_now_add=True)

    def __str__(self):
        return " ".join(vars(self).values())
