from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import send_mail
from django.utils import timezone

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

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

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


class auth_user_groups(viewsets.ModelViewSet):
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

    

class AuditoriaOfertasViewSet(viewsets.ModelViewSet):
    queryset = AuditoriaOfertas.objects.all()
    serializer_class = AuditoriaOfertasSerializer
