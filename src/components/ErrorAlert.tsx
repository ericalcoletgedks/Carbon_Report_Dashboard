
import { Alert, AlertDescription, AlertTitle } from './reui/alert'
import { CircleAlertIcon } from "lucide-react"

export const ErrorAlert = ({ error } : {error : string | null}) => {
    return (
            <Alert variant="destructive" className="mt-3 m-auto max-w-md">
                <CircleAlertIcon />
                <AlertTitle>File upload error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
    )
}
