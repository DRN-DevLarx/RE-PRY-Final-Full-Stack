from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User

from .models import (
    Usuarios, Intereses, InteresesUsuarios, Users_Usuarios, Ofertas, Empresas,
    OfertasEmpresas, Postulaciones, AuditoriaOfertas
)
from .serializers import (
    UsuariosSerializer, UsersSerializer, InteresesSerializer, InteresesUsuariosSerializer, Users_UsuariosSerializer,
    OfertasSerializer, EmpresasSerializer, OfertasEmpresasSerializer,
    PostulacionesSerializer, AuditoriaOfertasSerializer
)


# ------------------- Registro de Usuario -------------------
class RegisterUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [AllowAny]

# ------------------- Login y Cookies Seguras -------------------
# class UserLoginView(APIView):
#     def post(self, request):
#         username = request.data.get("username")
#         password = request.data.get("password")

#         user = authenticate(username=username, password=password)

#         if user:
#             refresh = RefreshToken.for_user(user)
#             response = Response({
#                 "user": {
#                     "first_name": user.first_name,
#                     "last_name": user.last_name,
#                     "email": user.email,
#                 }
#             }, status=status.HTTP_200_OK)

#             # Configurar cookie segura con JWT
#             response.set_cookie(
#                 key="jwt_token",
#                 value=str(refresh.access_token),
#                 httponly=True, 
#                 secure=True,  
#                 samesite="Lax",
#             )
#             response["Access-Control-Allow-Credentials"] = "true"
#             return response
        
#         else:
#             return Response({"error": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)

# ------------------- Obtener Datos del Usuario Autenticado -------------------
class UserDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "email": request.user.email,
        })



# class UserDataView(APIView):
#     permission_classes = [IsAuthenticated] 

#     def get(self, request):
#         user = request.user
#         return Response({
#             "id": user.id,
#             "username": user.username,
#             "first_name": user.first_name,
#             "last_name": user.last_name,
#             "email": user.email
#         })








# ------------------- ViewSets para gestión de modelos -------------------
class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
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


class OfertasViewSet(viewsets.ModelViewSet):
    queryset = Ofertas.objects.all()
    serializer_class = OfertasSerializer
    permission_classes = [AllowAny]

class EmpresasViewSet(viewsets.ModelViewSet):
    queryset = Empresas.objects.all()
    serializer_class = EmpresasSerializer

class OfertasEmpresasViewSet(viewsets.ModelViewSet):
    queryset = OfertasEmpresas.objects.all()
    serializer_class = OfertasEmpresasSerializer

class PostulacionesViewSet(viewsets.ModelViewSet):
    queryset = Postulaciones.objects.all()
    serializer_class = PostulacionesSerializer

class AuditoriaOfertasViewSet(viewsets.ModelViewSet):
    queryset = AuditoriaOfertas.objects.all()
    serializer_class = AuditoriaOfertasSerializer
