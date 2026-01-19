FROM golang:1.21-alpine AS builder

WORKDIR /app

# Instalar air para hot reload
RUN go install github.com/cosmtrek/air@latest

# Copiar go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copiar código fuente
COPY . .

# Build
RUN go build -o bin/api cmd/api/main.go

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY --from=builder /app/bin/api .
COPY --from=builder /go/bin/air /usr/local/bin/air

EXPOSE 8080

CMD ["./api"]
