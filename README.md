# Project Title
kms-cli

## Description
AWS KMS client for encrypting and decrypting secrets

## Installation
To install dependencies, run:
```bash
npm install
```

This project can also be set up using Docker. Build the Docker image using:
```bash
./docker-build.sh
```

## Usage
You can run the CLI using the following commands:

If you have Docker:
```bash
./run-cli.sh <input command> [arguments]
```

Alternatively, using Node.js directly:
```bash
node cli.js <input command> [arguments]
```

Or if installed globally or linked (via `npm link`):
```bash
kms-cli <input command> [arguments]
```

**Important Environment Variables:**
Make sure the following environment variables are set:
- `AWS_REGION`: The AWS region where the KMS key was created (e.g., `us-east-1`).
- `AWS_PROFILE`: Your AWS profile from `~/.aws/credentials` (e.g., `work-stuff`).
Alternatively, you can set:
- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

**Commands and Arguments:**

*   **Encrypt:**
    ```bash
    kms-cli encrypt --pt "my secret" -k <your_kms_encryption_key_id>
    ```
    *   `--pt` or `--plainText`: The secret to encrypt.
    *   `-k` or `--keyId`: Your AWS KMS encryption key ID.
    *   `--file <file-path>`: Encrypt content from a JSON file. The file should contain `keyId`, `plainText`, and optionally `awsRegion` and `awsProfile`.

*   **Decrypt:**
    ```bash
    kms-cli decrypt --ct "my encrypted secret"
    ```
    *   `--ct` or `--cipherText`: The encrypted secret (base64 encoded).

*   **Describe Encryption Key:**
    ```bash
    kms-cli describe -k <your_kms_encryption_key_id>
    ```
    *   `-k` or `--keyId`: Your AWS KMS encryption key ID.


For more detailed help, run:
```bash
kms-cli --help
```
or
```bash
./run-cli.sh --help
```

## Contributing

## License
MIT
