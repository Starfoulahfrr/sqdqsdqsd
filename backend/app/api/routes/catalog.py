from fastapi import APIRouter, Body, Request, HTTPException, status
from typing import List
from app.models.catalog import Category, Product

router = APIRouter()

@router.get("/categories", response_model=List[Category])
async def get_categories(request: Request):
    categories = await request.app.mongodb["categories"].find().to_list(1000)
    return categories

@router.post("/categories", response_model=Category)
async def create_category(request: Request, category: Category = Body(...)):
    new_category = await request.app.mongodb["categories"].insert_one(category.dict())
    created_category = await request.app.mongodb["categories"].find_one(
        {"_id": new_category.inserted_id}
    )
    return created_category

@router.put("/categories/{category_id}", response_model=Category)
async def update_category(category_id: str, request: Request, category: Category = Body(...)):
    update_result = await request.app.mongodb["categories"].update_one(
        {"_id": category_id}, {"$set": category.dict()}
    )
    if update_result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.delete("/categories/{category_id}")
async def delete_category(category_id: str, request: Request):
    delete_result = await request.app.mongodb["categories"].delete_one({"_id": category_id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"status": "success"}