import React from "react"
import { Card, Label, TextInput, Button } from 'flowbite-react/lib/cjs/components';


const Signup = () => {
    return (


        <div className="max-w-sm pt-[100px] m-auto">
            <Card className="mt-[40px] bg-transparent">
                <form className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block ">
                            <Label
                                htmlFor="username1"
                                value="Your username"
                            />
                        </div>
                        <TextInput
                            id="username1"
                            type="text"
                            placeholder="myusername"
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="Your email"
                            />
                        </div>
                        <TextInput
                            id="email1"
                            type="email"
                            placeholder="name@flowbite.com"
                            required={true}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Your password"
                            />
                        </div>
                        <TextInput
                            id="password1"
                            type="password"
                            required={true}
                        />
                    </div>

                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </Card>
        </div >

    )
}

export default Signup