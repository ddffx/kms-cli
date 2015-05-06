#!/bin/bash
docker run --rm --env-file .env ddffx/kms-cli /usr/local/bin/kms-cli "$@"