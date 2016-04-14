from rest_framework import serializers
from app.models import Tool
from app.models import Image
from app.models import IaaS
from app.models import DeployTool
from app.models import DeployImage
from app.models import Deploy


class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ('id', 'name', 'description', 'version', 'type',)


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'family', 'name', 'display', 'description', 'edition', 'language', 'architecture', )


class IaaSSerializer(serializers.ModelSerializer):
    class Meta:
        model = IaaS
        fields = ('id', 'name', 'description', 'type', 'ip', 'user', 'password', )


class DeployImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeployImage
        fields = ('idImage', 'name', )

class DeployToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeployTool
        fields = ('idTool', 'name', )


class DeploySerializer(serializers.ModelSerializer):
    tools = ToolSerializer(many=True,)
    images = ImageSerializer(many=True,)
    class Meta:
        model = Deploy
        fields = ("id","description","priority", "cleanrun", "tools","images","idIaaS",)

    def create(self, validated_data):
        tools_data = validated_data.pop('tools')
        images_data = validated_data.pop('images')
        
        deploy = Deploy.objects.create(**validated_data)
        
        for tool in tools_data:
            tl = DeployTool.objects.create(idTool=product.get("idTool"))
            tl.idTool = product.get("idTool")
            tl.name = product.get("name")
            tl.save()
            deploy.tools.add(tl)
            
        for image in images_data:
            ie = DeployImage.objects.create(idOS=oss.get("idImage"))
            ie.idImage = oss.get("idImage")
            ie.name = oss.get("name")
            
            ie.save()
            deploy.images.add(ie)
            
        deploy.save()
        return deploy



