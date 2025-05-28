from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator, EmailValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password

class Intereses(models.Model):
    nombre_interes = models.CharField(max_length=30)

class Usuarios (models.Model):
    identificacion_oferente = models.IntegerField()
    rol_oferente = models.CharField(max_length=30)
    nombre_oferente = models.CharField(max_length=30, unique=True, validators=[MinLengthValidator(3)])
    apellido_oferente = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    usuario = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    contrasena_oferente = models.CharField(max_length=30)
    telefono_oferente = models.CharField(unique=True, max_length=20, blank=True, null=True)
    correo_oferente = models.EmailField(unique=True, validators=[EmailValidator()])
    fecha_registro_oferente = models.DateTimeField(auto_now_add=True)
    referenciaIMG_oferente = models.CharField(max_length=30)
    estado_oferente = models.CharField(max_length=30)
    
    intereses = models.ManyToManyField(Intereses, through='InteresesUsuarios')
    

    def __str__(self):
        return f"{self.nombre_usuario} {self.apellido_usuario} {self.usuario_usuario} - {self.contrasea_usuario}"

class InteresesUsuarios(models.Model):
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    intereses = models.ForeignKey(Intereses, on_delete=models.CASCADE)

    def __str__(self):
        return " ".join(vars(self).values())

class Empresas(models.Model):
    identificacion_empresa = models.IntegerField()
    nombre_empresa = models.CharField(max_length=30)
    usuario = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    contrasena_empresa = models.CharField(max_length=30, validators=[MinLengthValidator(8)])
    telefono_empresa = models.CharField(max_length=30, validators=[MinLengthValidator(8)])
    correo_empresa = models.CharField(max_length=100)
    direccion_empresa = models.TextField()
    fecha_registro_empresa = models.DateTimeField(auto_now_add=True)
    referenciaIMG_empresa = models.CharField(max_length=30)
    estado_empresa = models.CharField(max_length=30)
    
    # def __str__(self):
    #     return " ".join(vars(self).values())
    

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
