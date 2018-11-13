AWS cli in minimal footprint
============================

Automatic built minimal docker image for AWS cli based on Alpine Linux (`library/alpine:latest`), around 77MB.

## Usage

configure an alias in your `~/.bash_profile`

```
alias aws="docker run -v $HOME:/root -v `pwd`:/workdir  pahud/awscli:latest"
```

in a new terminal, you can just run `aws` like this

```
$ aws sts get-caller-identity
{
    "Account": "123456789",
    "UserId": "XXXXXXXXXXXXXXX",
    "Arn": "arn:aws:iam::123456789:user/pahud"
}
```


Refer to <http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html> for detail.

## More information
Alpine Linux: <https://registry.hub.docker.com/_/alpine/>

AWS cli: <https://aws.amazon.com/cli/>
