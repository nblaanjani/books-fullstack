use Illuminate\Http\Request;
use App\Models\Tag;

public function createTag(Request $request)
{
    try {
        $tag = Tag::create([
            'name' => $request->name
        ]);

        return response()->json([
            'success' => true,
            'data' => $tag
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage()
        ]);
    }
}