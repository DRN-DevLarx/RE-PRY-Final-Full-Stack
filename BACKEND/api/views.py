from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import send_mail
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.core.cache import cache


from .models import (
    Usuarios, Intereses, InteresesUsuarios, Users_Usuarios, Ofertas, Empresas, Users_Empresas,
    Postulaciones, AuditoriaOfertas
)

from .serializers import (
    UsuariosSerializer, UsersSerializer, InteresesSerializer, InteresesUsuariosSerializer, Users_UsuariosSerializer,
    EmpresasSerializer, Users_EmpresasSerializer, OfertasSerializer,PostulacionesSerializer, AuditoriaOfertasSerializer, 
    CustomTokenObtainPairSerializer, user_groupsSerializer
)

UserGroup = User.groups.through

# ------------------- Registro de Usuario -------------------
class RegisterUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [AllowAny]


class UserDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UsersSerializer(request.user)
        return Response(serializer.data)
    
    
# ------------------- ViewSets para gestión de modelos -------------------
class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
    permission_classes = [AllowAny]

    # permission_classes = [IsAuthenticated]

class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [AllowAny]
        
class InteresesViewSet(viewsets.ModelViewSet):
    queryset = Intereses.objects.all()
    serializer_class = InteresesSerializer
    permission_classes = [AllowAny]

class InteresesUsuariosViewSet(viewsets.ModelViewSet):
    queryset = InteresesUsuarios.objects.all()
    serializer_class = InteresesUsuariosSerializer
    permission_classes = [AllowAny]


class Users_UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Users_Usuarios.objects.all()
    serializer_class = Users_UsuariosSerializer
    permission_classes = [AllowAny]


class auth_user_groupsView(viewsets.ModelViewSet):
    queryset = UserGroup.objects.all()
    serializer_class = user_groupsSerializer
    permission_classes = [AllowAny]


class EmpresasViewSet(viewsets.ModelViewSet):
    queryset = Empresas.objects.all()
    serializer_class = EmpresasSerializer
    permission_classes = [AllowAny]

class Users_EmpresasViewSet(viewsets.ModelViewSet):
    queryset = Users_Empresas.objects.all()
    serializer_class = Users_EmpresasSerializer
    permission_classes = [AllowAny]

class OfertasViewSet(viewsets.ModelViewSet):
    queryset = Ofertas.objects.all()
    serializer_class = OfertasSerializer
    permission_classes = [AllowAny]

class PostulacionesViewSet(viewsets.ModelViewSet):
    queryset = Postulaciones.objects.all()
    serializer_class = PostulacionesSerializer
    permission_classes = [AllowAny]

class CYSMensajesViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data
        print(data)
        
        # fingerprint = data.get('fingerprint')
        fingerprint = "jhwbeuhwebjhvew"
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        correo = data.get("correo")
        telefono = data.get("telefono")
        asunto = data.get("asunto")
        mensaje = data.get('mensaje')

        if not fingerprint:
            return Response({'error': 'Falta fingerprint'}, status=400)

        if not nombre or not mensaje:
            return Response({'error': 'Nombre y mensaje son obligatorios'}, status=400)

        hoy = timezone.now().date()

        clave_cache = f"mensajes_cys:{fingerprint}:{hoy}"
        contador = cache.get(clave_cache, 0)

        print(clave_cache)
        print(contador)
        
        if contador >=5:
            return Response({'error': 'Has alcanzado el límite de envíos para hoy'}, status=429)
        
        asunto_correo = f"Nuevo mensaje: {asunto or 'sin asunto'} de {nombre} {apellido or ''}".strip()
        cuerpo = (
            f" Nombre: {nombre} {apellido or ''}\n"
            f" Correo: {correo or 'No proporcionado'}\n"
            f" Teléfono: {telefono or 'No proporcionado'}\n"
            f" Identificador: {fingerprint}\n"
            f" Asunto: {asunto or 'Sin asunto'}\n\n"
            f" Mensaje:\n{mensaje}"
        )
   
        send_mail(
            subject=asunto_correo,
            message=cuerpo,
            from_email=None,
            recipient_list=["darienaguilar3000@gmail.com"],
            fail_silently=False
        )

        cache.set(clave_cache, contador + 1, 86400)  # 24h
        
        return Response({'exito': 'Enviado con éxito'}, status=201)

class EnviarClaveTemporalViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        
        data = request.data
        print(data)
        
        email = request.data.get("correo")
        username = request.data.get("usuario")
        
        if not email or not username:
            return Response({'error': 'Correo y nombre de usuario son obligatorios'}, status=400)

        try:
            user = User.objects.get(email=email, username=username)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado con esos datos'}, status=404)

        # Generar clave temporal (8 caracteres alfanuméricos)
        clave_temporal = get_random_string(length=8)

        # Guardar temporalmente
        user.set_password(clave_temporal)
        user.is_active = False
        user.save()

        # Enviar el correo
        asunto = "Tu contraseña temporal"
        cuerpo = f"""
            Hola {user.first_name or user.username},

            Se ha solicitado el restablecimiento de tu contraseña.

            Tu nueva contraseña temporal es: {clave_temporal}

            Saludos,
            El equipo de soporte
                    """.strip()

        send_mail(
            subject=asunto,
            message=cuerpo,
            from_email=None,  # Usa tu configuración DEFAULT_FROM_EMAIL
            recipient_list=[email],
            fail_silently=False
        )

        return Response({'mensaje': 'Correo enviado con la contraseña temporal'}, status=200)

class AuditoriaOfertasViewSet(viewsets.ModelViewSet):
    queryset = AuditoriaOfertas.objects.all()
    serializer_class = AuditoriaOfertasSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
