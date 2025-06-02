from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator, EmailValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password

class Intereses(models.Model):
    nombre_interes = models.CharField(max_length=30)

class Usuarios (models.Model):
    identificacion_oferente = models.IntegerField(unique=True)
    telefono_oferente = models.CharField(unique=True, max_length=20, blank=True, null=True)
    referenciaIMG_oferente = models.CharField(max_length=30, blank=True, null=True)
    estado_oferente = models.CharField(max_length=30)
    
    intereses = models.ManyToManyField(Intereses, through='InteresesUsuarios', related_name='Usuarios')
    
    def __str__(self):
        return " ".join(vars(self).values())
    
    
class InteresesUsuarios(models.Model):
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    intereses = models.ForeignKey(Intereses, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("usuario", "intereses")  # Asegura que no haya duplicados

class Empresas(models.Model):
    identificacion_empresa = models.IntegerField(unique=True)
    nombre_empresa = models.CharField(max_length=30, unique=True,)
    usuario = models.CharField(max_length=30, validators=[MinLengthValidator(3)], unique=True,)
    contrasena_empresa = models.CharField(max_length=30, validators=[MinLengthValidator(8)])
    telefono_empresa = models.CharField(max_length=30, validators=[MinLengthValidator(8)], unique=True,)
    correo_empresa = models.CharField(max_length=100, unique=True,)
    direccion_empresa = models.TextField()
    fecha_registro_empresa = models.DateTimeField(auto_now_add=True)
    referenciaIMG_empresa = models.CharField(max_length=30)
    estado_empresa = models.CharField(max_length=30)
    
    def __str__(self):
        return " ".join(vars(self).values())
    

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
