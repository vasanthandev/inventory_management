import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import toast, { Toaster } from "react-hot-toast";
import { router, usePage } from "@inertiajs/react";
function index({ product }) {
    const props = usePage().props;
    console.log(props);
    function deleteProduct(productId) {
        // $.ajax(
        //     {
        //         type:"delete",
        //         url:'/product/'+productId,

        //         data:{'id' : productId, _token: props.csrf_token,},
        //         headers: {'XSRF-TOKEN': $('meta[name="_token"]').attr('content')},
        //         success:function(res)
        //         {
        //             toast('Recored deleted')
        //         },
        //         error:function(res){
        //             toast('try later')
        //         }
        //     }
        // )


        axios
            .delete("/product/" + productId)
            .then(function (response) {
                console.log(response)
                if (response.data.status == "done") {
                    toast(response.data.message)
                    router.get(route('product.index'))
                }
                else
                {
                    toast(response.data.message)
                }
            })
            .catch(function (error) {
                console.log(error);
                toast(response.data.message)
            });
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Product
                </h2>
            }
        >
            <Head title="Product" />
            {console.log(product)}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Button variant="outline-primary">
                                <Link
                                    as="button"
                                    href={route("product.create")}
                                >
                                    Add product
                                </Link>
                            </Button>
                        </div>
                        <div className="p-3">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Country</th>
                                        <th>State</th>
                                        <th>Details</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.data.map((eachProduct, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{eachProduct.name}</td>
                                                <td>{eachProduct.country}</td>
                                                <td>{eachProduct.state}</td>
                                                <td>
                                                    {eachProduct.details.map(
                                                        (eachDetails) => {
                                                            return (
                                                                <div className="flex">
                                                                    <div className="pr-2">
                                                                        size{" "}
                                                                        {
                                                                            eachDetails.size
                                                                        }
                                                                    </div>
                                                                    <div className="pr-2">
                                                                        length{" "}
                                                                        {
                                                                            eachDetails.length
                                                                        }
                                                                    </div>
                                                                    <div className="pr-2">
                                                                        quantity{" "}
                                                                        {
                                                                            eachDetails.quantity
                                                                        }
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={() =>
                                                            deleteProduct(
                                                                eachProduct.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </AuthenticatedLayout>
    );
}

export default index;
