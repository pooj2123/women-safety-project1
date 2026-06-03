
print("MAIN 1")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.navigation import router as navigation_router
print("MAIN 2")
from app.routes.search import router as search_router
print("MAIN 3")

print("IMPORTS COMPLETE")
app = FastAPI()
print("MAIN 4")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://women-safety-project1-uypk.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    navigation_router,
    prefix="/api/navigation"
)

app.include_router(search_router)

@app.get("/")
def root():
    return {"message": "API running"}