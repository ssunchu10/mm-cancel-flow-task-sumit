import Image from "next/image";

export default function MainImage() {
    return (
        <div className="hidden md:block relative h-56 md:h-auto rounded-xl overflow-hidden">
            <Image
                src="/main.jpg"
                alt="City skyline"
                fill
                priority
                className="object-cover"
            />
        </div>
    );
}
