#!/bin/bash
aws s3 cp dist/ s3://cryptottwits-admin-prod/ --recursive
# 静态资源缓存
aws cloudfront create-invalidation --distribution-id E2V09VZ0ALJD9G --paths "/*"

