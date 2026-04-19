<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
public function up(): void
{
Schema::create('post_tag', function (Blueprint $table) {


$table->id();
$table->foreignId('post_id')->constrained('post
s')->onDelete('cascade');
$table->foreignId('tag_id')->constrained('tags')->onDelete('cascade');
$table->timestamps();});
}
public function down(): void
{
Schema::dropIfExists('post_tag');
}
};
Schema::create('post_tag', function (Blueprint $table) {
    $table->id();
    $table->foreignId('post_id')->constrained()->cascadeOnDelete();
    $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
});