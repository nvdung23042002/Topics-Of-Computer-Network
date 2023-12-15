terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

# Configure the aws provider 
provider "aws" {
  region     = "ap-southeast-1"
  access_key = "AKIAWPKAUWJ5YNEEZHUN"
  secret_key = "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"
}
