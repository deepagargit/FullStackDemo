from django.shortcuts import render

# Create your views here.

from app.models import Tool
from app.models import Image
from app.models import IaaS
from app.models import Deploy

from django.http import Http404

from app.serializers import ToolSerializer
from app.serializers import ImageSerializer
from app.serializers import IaaSSerializer
from app.serializers import DeploySerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ToolList(APIView):
    """
        List all servers, or create a new server.
    """
    def get(self, request, format=None):
        tools = Tool.objects.all()
        serializer = ToolSerializer(tools, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ToolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        tool = self.get_object(id)
        tool.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class ToolDetail(APIView):
    """
    Retrieve, update or delete a user instance.
    """
    def get_object(self, pk):
        try:
            return Tool.objects.get(pk=pk)
        except Tool.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        tool = self.get_object(pk)
        serializer = ToolSerializer(tool)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        tool = self.get_object(pk)
        serializer = ToolSerializer(tool, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        tool = self.get_object(pk)
        tool.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

		
class ImageList(APIView):
    """
        List all servers, or create a new server.
    """
    def get(self, request, format=None):
        tools = Image.objects.all()
        serializer = ImageSerializer(tools, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        image = self.get_object(id)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class ImageDetail(APIView):
    """
    Retrieve, update or delete a user instance.
    """
    def get_object(self, pk):
        try:
            return Image.objects.get(pk=pk)
        except Image.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        image = self.get_object(pk)
        serializer = ImageSerializer(vm_server)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        image = self.get_object(pk)
        serializer = ImageSerializer(image, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        image = self.get_object(pk)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class IaaSList(APIView):
    """
        List all servers, or create a new server.
    """
    def get(self, request, format=None):
        iaass = IaaS.objects.all()
        serializer = IaaSSerializer(iaass, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = IaaSSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        iaas = self.get_object(id)
        iaas.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class IaaSDetail(APIView):
    """
    Retrieve, update or delete a user instance.
    """
    def get_object(self, pk):
        try:
            return IaaS.objects.get(pk=pk)
        except IaaS.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        iaas = self.get_object(pk)
        serializer = IaaSSerializer(vm_server)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        iaas = self.get_object(pk)
        serializer = IaaSSerializer(iaas, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        iaas = self.get_object(pk)
        iaas.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class DeployList(APIView):
    """
        List all servers, or create a new server.
    """
    def get(self, request, format=None):
        deploys = Deploy.objects.all()
        serializer = DeploySerializer(deploys, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DeploySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        deploy = self.get_object(id)
        deploy.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class DeployDetail(APIView):
    """
    Retrieve, update or delete a user instance.
    """
    def get_object(self, pk):
        try:
            return Deploy.objects.get(pk=pk)
        except Deploy.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        deploy = self.get_object(pk)
        serializer = DeploySerializer(vm_server)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        deploy = self.get_object(pk)
        serializer = DeploySerializer(deploy, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        deploy = self.get_object(pk)
        deploy.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


