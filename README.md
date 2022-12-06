# MyWorkDoc Admin Panel

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.  To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Docker

## Build Image

|Arguments|Description|
|---|---|
|`CONFIG`|Options should be taken from the project configuration.<br>Default: `development`|

### Intel Chip

```bash
# Build dockerfile
docker build --no-cache=true --build-arg CONFIG=development -t mwd-admin:select_x.x.x_final .
```

### Mac Chip

```bash
# Build dockerfile
docker buildx build --platform=linux/amd64 --no-cache=true --build-arg CONFIG=development -t mwd-admin:select_x.x.x .
```

## Push Image to AWS

```bash
# Retrieve an authentication token and authenticate your Docker client to your registry.
# Use the AWS CLI
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 869365073754.dkr.ecr.us-east-1.amazonaws.com

# build your image using the options above

# After the build completes, tag your image so you can push the image to this repository
docker tag mwd-admin:select_x.x.x 869365073754.dkr.ecr.us-east-1.amazonaws.com/mwd-admin:select_x.x.x

# Run the following command to push this image to your newly created AWS repository
docker push 869365073754.dkr.ecr.us-east-1.amazonaws.com/mwd-admin:select_x.x.x
```

## View Images in ECR

```bash
aws ecr list-images --repository-name mwd-admin
```
