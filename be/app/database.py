import json
import os
from typing import Dict, List, TypeVar, Generic, Type
from pydantic import BaseModel
from datetime import date

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return obj.isoformat()
        return super().default(obj)

T = TypeVar('T', bound=BaseModel)

class JSONDatabase(Generic[T]):
    def __init__(self, file_path: str, model_class: Type[T]):
        self.file_path = file_path
        self.model_class = model_class
        self._ensure_file_exists()

    def _ensure_file_exists(self):
        if not os.path.exists(self.file_path):
            os.makedirs(os.path.dirname(self.file_path), exist_ok=True)
            with open(self.file_path, 'w') as f:
                json.dump([], f)

    def _read_data(self) -> List[Dict]:
        with open(self.file_path, 'r') as f:
            return json.load(f)

    def _write_data(self, data: List[Dict]):
        with open(self.file_path, 'w') as f:
            json.dump(data, f, indent=2, cls=DateTimeEncoder)

    def get_all(self) -> List[T]:
        data = self._read_data()
        return [self.model_class(**item) for item in data]

    def get_by_id(self, id: int) -> T | None:
        data = self._read_data()
        for item in data:
            if item.get('id') == id:
                return self.model_class(**item)
        return None

    def create(self, item: T) -> T:
        data = self._read_data()
        # Auto-increment ID
        max_id = max([item.get('id', 0) for item in data], default=0)
        new_item = item.dict()
        new_item['id'] = max_id + 1
        data.append(new_item)
        self._write_data(data)
        return self.model_class(**new_item)

    def update(self, id: int, item: T) -> T | None:
        data = self._read_data()
        for i, existing_item in enumerate(data):
            if existing_item.get('id') == id:
                updated_item = item.dict()
                updated_item['id'] = id
                data[i] = updated_item
                self._write_data(data)
                return self.model_class(**updated_item)
        return None

    def delete(self, id: int) -> bool:
        data = self._read_data()
        initial_length = len(data)
        data = [item for item in data if item.get('id') != id]
        if len(data) != initial_length:
            self._write_data(data)
            return True
        return False 