// components/PlantSelector.tsx
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent } from "./ui/dialog"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command"
import { cn } from "../lib/utils"

interface PlantSelectorProps {
    entities: string[]
    selected: string
    onSelect: (entity: string) => void
}

export function PlantSelector({ entities, selected, onSelect }: PlantSelectorProps) {
    const [open, setOpen] = useState(false)

    const displayName = (entity: string) =>
        entity.replace("Planta ", "").replace("Total empresa", "Total")

    return (
        <>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-48 justify-between"
                onClick={() => setOpen(true)}
            >
                {displayName(selected)}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="overflow-hidden p-0 shadow-lg">
                    <Command>
                        <CommandInput placeholder="Search plant..." />
                        <CommandList>
                            <CommandEmpty>No plant found.</CommandEmpty>
                            <CommandGroup heading="Plants">
                                {entities.map((entity) => (
                                    <CommandItem
                                        key={entity}
                                        value={entity}
                                        onSelect={() => {
                                            onSelect(entity)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selected === entity ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {displayName(entity)}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    )
}