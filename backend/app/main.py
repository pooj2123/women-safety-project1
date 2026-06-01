from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.navigation import router as navigation_router
from app.routes.search import router as search_router  # make sure this exists

app = FastAPI()

# ✅ CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # IMPORTANT
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routes
app.include_router(navigation_router)
app.include_router(search_router)

@app.get("/")
def root():
    return {"message": "API running"}