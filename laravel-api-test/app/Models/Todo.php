<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    public function user()
    {
        // Getter that retrieves the user that the todo belongs to
        return $this->belongsTo(User::class);
    }
}
