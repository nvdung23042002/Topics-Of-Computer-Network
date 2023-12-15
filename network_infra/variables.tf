variable "vpc_name" {
  default     = "lab_vpc"
  description = "Name of VPC"
}

variable "public_subnet_name" {
  default     = "lab_public_subnet"
  description = "Identifier for public subnet"
}

variable "private_subnet_name_1" {
  default     = "lab_private_subnet_1"
  description = "Name of private subnet"
}

variable "private_subnet_name_2" {
  default     = "lab_private_subnet_2"
  description = "Name of private subnet"
}

variable "igw_name" {
  default     = "lab_igw"
  description = "Name of internet gateway"
}

variable "route_table_public" {
  default     = "lab_public_rtb"
  description = "Name of route table"
}

variable "vpc_sg" {
  default     = "vpc_sg"
  description = "Name of VPC security group"
}

variable "route_table_private" {
  default     = "lab_nat_gateway_rtb"
  description = "Name of route table"
}