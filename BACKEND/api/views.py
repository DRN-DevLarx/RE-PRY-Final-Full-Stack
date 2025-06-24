from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import date

from .models import (
    Usuarios, Intereses, InteresesUsuarios, Users_Usuarios, Ofertas, Empresas, Users_Empresas,
    Postulaciones, AuditoriaOfertas, CYSMensajes
)

from .serializers import (
    UsuariosSerializer, UsersSerializer, InteresesSerializer, InteresesUsuariosSerializer, Users_UsuariosSerializer,
    EmpresasSerializer, Users_EmpresasSerializer, OfertasSerializer,PostulacionesSerializer, AuditoriaOfertasSerializer, 
    CustomTokenObtainPairSerializer, user_groupsSerializer, CYSMensajesSerializer
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

    def create(self, request, *args, **kwargs):
        form_user_id = request.data.get('formUserId')

        if not form_user_id:
            return Response({'error': 'Falta formUserId en el request'}, status=status.HTTP_400_BAD_REQUEST)

        hoy = date.today()
        envios_hoy = Postulaciones.objects.filter(
            form_user_id=form_user_id,
            fecha_postulacion__date=hoy
        ).count()

        if envios_hoy >= 5:
            return Response({'error': 'Límite diario alcanzado'}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        return super().create(request, *args, **kwargs)

 

class CYSMensajesViewSet(viewsets.ModelViewSet):
    queryset = CYSMensajes.objects.all()
    serializer_class = CYSMensajesSerializer
    permission_classes = [AllowAny]
    

class AuditoriaOfertasViewSet(viewsets.ModelViewSet):
    queryset = AuditoriaOfertas.objects.all()
    serializer_class = AuditoriaOfertasSerializer
