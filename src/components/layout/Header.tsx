
import { ThemeToggle } from '../ThemeToggle'
import MappaLogo from "../../assets/logo.svg"
import { Separator } from "../ui/separator"

export const Header = () => {
    return (
        <>
            <div className="fixed z-50 top-0 left-1/2 -translate-x-1/2 w-full">

                <div className="flex justify-between w-full text-sm p-4 px-6 backdrop-blur-2xl">

                    <div className="flex flex-col gap-1.5">
                        <div className="leading-none font-medium">

                            <div className="leading-none font-medium">
                                <div
                                    className="h-6 w-18 bg-black dark:bg-white"
                                    style={{
                                        maskImage: `url(${MappaLogo})`,
                                        maskRepeat: "no-repeat",
                                        maskSize: "contain",
                                        maskPosition: "center",
                                        WebkitMaskImage: `url(${MappaLogo})`,
                                        WebkitMaskRepeat: "no-repeat",
                                        WebkitMaskSize: "contain",
                                        WebkitMaskPosition: "center",
                                    }}
                                />
                            </div>

                        </div>
                        <div className="text-muted-foreground">
                            The Climate OS for Industry
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </div>

                <Separator />
            </div>
        </>
    )
}
