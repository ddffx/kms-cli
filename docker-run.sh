#!/bin/bash
#
echo "docker run"
docker run -i -t \
	--env-file .env \
	kms-cli