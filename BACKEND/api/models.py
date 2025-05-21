from django.db import models
from django.core.validators import MinLengthValidator, MinValueValidator, EmailValidator

class Intereses(models.Model):
    intereses_ID = models.IntegerField(primary_key=True)
    turismo_y_hoteleria = models.BooleanField(default=False)
    comercio_y_ventas = models.BooleanField(default=False)
    eduacion_y_salud = models.BooleanField(default=False)
    construccion = models.BooleanField(default=False)
    tecnologia = models.BooleanField(default=False)
    servicios = models.BooleanField(default=False)
    pesca_y_agricultura = models.BooleanField(default=False)


class Usuarios (models.Model):
    usuario_ID = models.IntegerField(primary_key=True)
    identificacion_usuario = models.IntegerField()
    rol_usuario = models.CharField(max_length=30)
    nombre_usuario = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    apellido_usuario = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    usuario_usuario = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    contraseña_usuario = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    telefono_usuario = models.CharField(max_length=20, blank=True, nuñll=True)
    correo_usuario = models.EmailField(unique=True, validators=[EmailValidator()])
    fecha_registro_usuario = models.DateTimeField(auto_now_add=True)
    referenciaIMG_usuario = models.CharField(max_length=30)
    estado_usuario = models.CharField(max_length=30)
    
    intereses = models.ManyToManyField(Intereses, through='InteresesUsuarios')
    

    def __str__(self):
        return f"{self.nombre_usuario} {self.apellido_usuario} {self.usuario_usuario} - {self.contraseña_usuario}"


class InteresesUsuarios(models.Model):
    intereses_usuario_ID = models.IntegerField()
    identificacion_usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    intereses_ID = models.ForeignKey(Intereses, on_delete=models.CASCADE)





class OfertasDisponibles (models.Model):
    oferta_ID = models.IntegerField()
    titulo_oferta = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    nombre_puesto_ofertaD = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    categoria_ofertaD = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    vacantes_ofertaD = models.IntegerField()
    ubicacion_ofertaD = models.TextField()
    fecha_ofertaD = models.DateTimeField(auto_now_add=True)
    salario_ofertaD = models.CharField(max_length=30)
    descripcion_ofertaD = models.TextField()
    requisitos_ofertaD = models.TextField()
    referenciaIMG_ofertaD = models.CharField(max_length=30)
    estado_ofertaD = models.CharField(max_length=30)
    # identificacion = models.ForeignKey("app.Model", verbose_name=_(""), on_delete=models.CASCADE)


    def __str__(self):
        return " ".join(vars(self).values())

class categorias(models.Model):
    nombre_categoria = models.CharField(max_length=20)


class Empresas(models.Model):
    identificacion_empresa = models.IntegerField()
    nombre_empresa = models.CharField(max_length=30, validators=[MinLengthValidator(5)])
    apellido_empresa = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    usuario = models.CharField(max_length=30, validators=[MinLengthValidator(3)])
    contraseña_empresa = models.CharField(max_length=30, validators=[MinLengthValidator(8)])
    telefono_empresa = models.CharField(max_length=30, validators=[MinLengthValidator(8)])
    correo_empresa = models.CharField(max_length=100)
    direccion_empresa = models.TextField()
    fecha_registro_empresa = models.DateTimeField(auto_now_add=True)
    referenciaIMG_empresa = models.CharField(max_length=30)
    estado_empresa = models.CharField(max_length=30)
    
    def __str__(self):
        return " ".join(vars(self).values())
    
class OfertasEmpresas(models.Model):
    Ofertas_empresa = models.IntegerField(primary_key=True)
    ofertaD = models.ForeignKey(OfertasDisponibles, on_delete=models.CASCADE)
    identificacion_empresa = models.ForeignKey(Empresas, on_delete=models.CASCADE)
    

class Postulaciones(models.Model):
    postulacion_ID = models.IntegerField(primary_key=True)
    identificacion_usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    ofertaD = models.ForeignKey(OfertasDisponibles, on_delete=models.CASCADE)
    fecha_postulacion =models.DateTimeField(auto_now_add=True)
    
class OfertasDesactivadas(models.Model):
    oferta_desact_ID = models.IntegerField(primary_key=True)
    ofertaD_ID = models.ForeignKey(OfertasDisponibles, on_delete=models.CASCADE)
    motivo = models.TextField()
    fecha_desactiva = models.DateTimeField (auto_now_add=True)
    
    
class relacion_OfertasDesact(models.Model):
    relacion_OfertasDesact_ID = models.IntegerField(primary_key=True)
    ofertaD = models.ForeignKey(OfertasDisponibles, on_delete=models.CASCADE)
    oferta_desact_ID = models.ForeignKey(OfertasDesactivadas, on_delete=models.CASCADE)
    motivo = models.CharField(max_length=100)
   
