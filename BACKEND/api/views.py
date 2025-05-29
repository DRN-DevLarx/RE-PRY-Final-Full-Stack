from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from .models import (
    Usuarios, Intereses, InteresesUsuarios, Ofertas, Empresas,
    OfertasEmpresas, Postulaciones, AuditoriaOfertas
)
from .serializers import (
    UsuariosSerializer, UsersSerializer, InteresesSerializer, InteresesUsuariosSerializer, 
    OfertasSerializer, EmpresasSerializer, OfertasEmpresasSerializer,
    PostulacionesSerializer, AuditoriaOfertasSerializer
)

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.views import APIView

# ------------------- Permisos personalizados -------------------
class IsAdminUserGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="admin").exists()

class IsEmpresaUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="empresa").exists()

class IsUsuarioUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="usuario").exists()

# ------------------- Vistas Usuarios -------------------
class RegisterUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [AllowAny]

class UserDetailView(RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UsersSerializer
    


class UsuariosListCreateView(ListCreateAPIView):
    # permission_classes = [IsAuthenticated, IsAdminUserGroup]
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

class UsuariosDetailView(RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated, IsAdminUserGroup]
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer


class UserLoginView(APIView):
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            response = Response({
                "user": {
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                }
            }, status=status.HTTP_200_OK)

            # Configurar cookie
            response.set_cookie(
                key="jwt_token",
                value=str(refresh.access_token),
                httponly=True, 
                secure=False,
                samesite="Lax",
            )
            response["Access-Control-Allow-Credentials"] = "true"
            return response
        
        else:
            return Response({"error": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)


class UserDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                "message": "Datos protegidos",
                "user": {
                    "first_name": request.user.first_name,
                    "last_name": request.user.last_name,
                    "email": request.user.email,
                }
            })
        return Response({"error": "No autorizado"}, status=status.HTTP_401_UNAUTHORIZED)



# ------------------- Vistas Intereses -------------------
class InteresesListCreateView(ListCreateAPIView):
    queryset = Intereses.objects.all()
    serializer_class = InteresesSerializer

class InteresesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Intereses.objects.all()
    serializer_class = InteresesSerializer

# ------------------- Vistas InteresesUsuarios -------------------
class InteresesUsuariosListCreateView(ListCreateAPIView):
    queryset = InteresesUsuarios.objects.all()
    serializer_class = InteresesUsuariosSerializer

class InteresesUsuariosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = InteresesUsuarios.objects.all()
    serializer_class = InteresesUsuariosSerializer

# ------------------- Vistas Ofertas -------------------
class OfertasListCreateView(ListCreateAPIView):
    queryset = Ofertas.objects.all()
    serializer_class = OfertasSerializer

class OfertasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ofertas.objects.all()
    serializer_class = OfertasSerializer

# ------------------- Vistas Empresas -------------------
class EmpresasListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsEmpresaUser]
    queryset = Empresas.objects.all()
    serializer_class = EmpresasSerializer

class EmpresasDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsEmpresaUser]
    queryset = Empresas.objects.all()
    serializer_class = EmpresasSerializer

# ------------------- Vistas OfertasEmpresas -------------------
class OfertasEmpresasListCreateView(ListCreateAPIView):
    queryset = OfertasEmpresas.objects.all()
    serializer_class = OfertasEmpresasSerializer

class OfertasEmpresasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = OfertasEmpresas.objects.all()
    serializer_class = OfertasEmpresasSerializer

# ------------------- Vistas Postulaciones -------------------
class PostulacionesListCreateView(ListCreateAPIView):
    queryset = Postulaciones.objects.all()
    serializer_class = PostulacionesSerializer

class PostulacionesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Postulaciones.objects.all()
    serializer_class = PostulacionesSerializer


class AuditoriaOfertasListCreateView(ListCreateAPIView):
    queryset = AuditoriaOfertas.objects.all()
    serializer_class = AuditoriaOfertasSerializer
    
class AuditoriaOfertasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = AuditoriaOfertas
    serializer_class = AuditoriaOfertasSerializer
    