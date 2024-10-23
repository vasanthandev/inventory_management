import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

function Create() {
    const [state, setState] = useState([]);

    useEffect(() => {
        $.ajax({
            type: "get",
            url: "/state",
            success: function (res) {
                setState(res);
            },
        });
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        country: "",
        state: "",
        image: null,
        s_lenght: 0,
        s_quantity: 0,
        m_lenght: 0,
        m_quantity: 0,
        l_lenght: 0,
        l_quantity: 0,

    });

    function submitForm(e) {
        e.preventDefault();
        post(route("product.store"), {
            success: function (res) {
                reset();
            },
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
            {console.log(data)}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Form onSubmit={submitForm}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Product name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <div className="text-red-600">
                                            {errors.name}
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={data.country}
                                        onChange={(e) =>
                                            setData("country", e.target.value)
                                        }
                                    >
                                        <option>Choose Country</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                    </Form.Select>
                                    {errors.country && (
                                        <div className="text-red-600">
                                            {errors.country}
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>State</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={data.state}
                                        onChange={(e) =>
                                            setData("state", e.target.value)
                                        }
                                    >
                                        <option>Choose State</option>
                                        {state.map((eachSata) => {
                                            return (
                                                <option value={eachSata}>
                                                    {eachSata}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                    {errors.state && (
                                        <div className="text-red-600">
                                            {errors.state}
                                        </div>
                                    )}
                                </Form.Group>

                                <Form.Group
                                    controlId="formFile"
                                    className="mb-3"
                                >
                                    <Form.Label>Product Image</Form.Label>
                                    <Form.Control
                                        onChange={(e) =>
                                            setData("image", e.target.files[0])
                                        }
                                        type="file"
                                        // accept=".jpg,.png"
                                    />
                                    {errors.image && (
                                        <div className="text-red-600">
                                            {errors.image}
                                        </div>
                                    )}
                                </Form.Group>


                                <Row className="mb-3">

                                    <Form.Group as={Col} md="4">
                                        <Form.Label>S</Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>length</Form.Label>
                                        <Form.Control
                                            value={data.s_lenght}
                                            onChange={(e) =>
                                                setData(
                                                    "s_lenght",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                        />
                                        {errors.s_lenght && (
                                            <div className="text-red-600">
                                                {errors.s_lenght}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>length</Form.Label>
                                        <Form.Control
                                            value={data.s_quantity}
                                            onChange={(e) =>
                                                setData(
                                                    "s_quantity",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                        />
                                        {errors.s_quantity && (
                                            <div className="text-red-600">
                                                {errors.s_quantity}
                                            </div>
                                        )}
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>M</Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>length</Form.Label>
                                        <Form.Control
                                            value={data.m_lenght}
                                            onChange={(e) =>
                                                setData(
                                                    "m_lenght",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                        />
                                        {errors.m_lenght && (
                                            <div className="text-red-600">
                                                {errors.m_lenght}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            value={data.m_quantity}
                                            onChange={(e) =>
                                                setData(
                                                    "m_quantity",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                        />
                                        {errors.m_quantity && (
                                            <div className="text-red-600">
                                                {errors.m_quantity}
                                            </div>
                                        )}
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>M</Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>length</Form.Label>
                                        <Form.Control
                                            value={data.l_lenght}
                                            onChange={(e) =>
                                                setData(
                                                    "l_lenght",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                        />
                                        {errors.l_lenght && (
                                            <div className="text-red-600">
                                                {errors.l_lenght}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            value={data.l_quantity}
                                            onChange={(e) =>
                                                setData(
                                                    "l_quantity",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                        />
                                        {errors.l_quantity && (
                                            <div className="text-red-600">
                                                {errors.l_quantity}
                                            </div>
                                        )}
                                    </Form.Group>
                                </Row>
                                <button type="submit">Submit</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Create;
