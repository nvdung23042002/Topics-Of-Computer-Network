#Configure VPC
resource "aws_vpc" "my_vpc" {
  cidr_block           = "10.30.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = var.vpc_name
  }
}

#Configure subnet
resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.30.16.0/20"
  availability_zone = "ap-southeast-1a"

  tags = {
    Name = var.public_subnet_name
  }
}

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.30.128.0/20"
  availability_zone = "ap-southeast-1a"

  tags = {
    Name = var.private_subnet_name_1
  }
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.30.144.0/20"
  availability_zone = "ap-southeast-1b"

  tags = {
    Name = var.private_subnet_name_2
  }
}

#Configure internet gateway
resource "aws_internet_gateway" "my_igw" {
  vpc_id = aws_vpc.my_vpc.id
  tags = {
    Name = var.igw_name
  }
}

#Configure route table public subnet
resource "aws_route_table" "my_rtb_public" {
  vpc_id = aws_vpc.my_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_igw.id
  }
  tags = {
    Name = var.route_table_public
  }
}
resource "aws_route_table_association" "my_rtb_association_public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.my_rtb_public.id
}

resource "aws_security_group" "vpc_sg" {
  name        = "vpc_sg"
  description = "Allow SSH inbound connections"
  vpc_id      = aws_vpc.my_vpc.id
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = var.vpc_sg
  }
}

#Configure NAT gateway
resource "aws_eip" "nat_gw_eip" {
  vpc = true
}
resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_gw_eip.id
  subnet_id     = aws_subnet.public.id
}

#Configure private route table
resource "aws_route_table" "my_rtb_private" {
  vpc_id = aws_vpc.my_vpc.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }
  tags = {
    Name = var.route_table_private
  }
}
resource "aws_route_table_association" "my_rtb_association_private_1" {
  subnet_id      = aws_subnet.private_1.id
  route_table_id = aws_route_table.my_rtb_private.id
}
resource "aws_route_table_association" "my_rtb_association_private_2" {
  subnet_id      = aws_subnet.private_2.id
  route_table_id = aws_route_table.my_rtb_private.id
}

