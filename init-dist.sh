sudo rm -rf dist
npm run build
scp -i /home/luukien/Downloads/first-instance.pem -r dist/ ec2-user@ec2-13-212-170-169.ap-southeast-1.compute.amazonaws.com:/home/ec2-user
ssh -i /home/luukien/Downloads/first-instance.pem ec2-user@ec2-13-212-170-169.ap-southeast-1.compute.amazonaws.com << 'EOF'
. init-nginx.sh
EOF