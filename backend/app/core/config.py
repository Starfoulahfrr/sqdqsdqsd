from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Christian Bot Admin"
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_NAME: str = "christian_bot"
    JWT_SECRET: str = "your-secret-key"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 jours
    BOT_TOKEN: str = "your-bot-token"

    class Config:
        env_file = ".env"

settings = Settings()