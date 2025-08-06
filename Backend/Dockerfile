# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY *.csproj ./
RUN dotnet restore

# Copy everything and publish
COPY . .
RUN dotnet publish -c Release -o /app/out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Set default port (Render will override with PORT env var if needed)
ENV ASPNETCORE_URLS=http://+:8080

COPY --from=build /app/out ./

EXPOSE 8080

ENTRYPOINT ["dotnet", "Backend.dll"]
