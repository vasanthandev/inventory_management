<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResoucrce;
use App\Models\Detail;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function Index()
    {
        $product = Product::with('details')->paginate(10);
        return Inertia::render('Product/index',[
            'product' => ProductResoucrce::collection($product)
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Product/Create');
    }

    public function Store(Request $request)
    {
        Log::info("request", $request->all());
        $valedated = $request->validate([
            "name" => ['required', 'string', 'max:150', 'bail'],
            "country" => ['required'],
            "state" => ['required'],
            "image" => ['required', 'image', 'max:500'],
            "s_lenght" => ['required', 'numeric'],
            "s_quantity" => ['required', 'numeric'],
            "m_lenght" => ['required', 'numeric'],
            "m_quantity" => ['required', 'numeric'],
            "l_lenght" => ['required', 'numeric'],
            "l_quantity" => ['required', 'numeric']
        ]);

        DB::beginTransaction();
        try {
            $product = new Product();
            $product->name = $valedated['name'];
            $product->country = $valedated['country'];
            $product->state = $valedated['state'];
            $product->image_url = "";
            $image = $request->file('image');
            $filename = time()."_". preg_replace('/\s+/', '_', strtolower($image->getClientOriginalName()));
            $tmp = $image->storeAs('uploads', $filename, 'public');
            $product->image_url = $tmp;
            $product->save();
            $product->details()->saveMany([
                new Detail([
                    "size" => "s",
                    "length" => $valedated["s_lenght"],
                    "quantity" => $valedated["s_quantity"]
                ]),
                new Detail([
                    "size" => "m",
                    "length" => $valedated["m_lenght"],
                    "quantity" => $valedated["m_quantity"]
                ]),
                new Detail([
                    "size" => "l",
                    "length" => $valedated["l_lenght"],
                    "quantity" => $valedated["l_quantity"]
                ])
            ]);
            DB::commit();
            return to_route('product.index');

        } catch (\Throwable $th) {
            // throw $th;
            DB::rollBack();
            Log::error("error", $th);
            return [
                "satatus" => "error",
                "message" => "try later"
            ];
        }
    }

    public function destroy(Request $request, $productId)
    {
        log::info("id ".$productId);
        DB::beginTransaction();
        try {
            Product::find($productId)->delete();
            Detail::where("product_id",$productId)->delete();
            DB::commit();
            return [
                "status" => "done",
                "message" => "recored deleted"
            ];
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error("error ".$th);
            return [
                "satatus" => "error",
                "message" => "try later"
            ];
        }
    }
}
