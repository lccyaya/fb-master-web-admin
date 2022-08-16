#!/bin/bash
# aws s3 rm s3://cryptottwits-admin-dev/ --recursive
aws s3 cp dist/ s3://cryptottwits-admin-dev/ --recursive
# 静态资源缓存
aws cloudfront create-invalidation --distribution-id E2C7J3H3WH45IL --paths "/*"

