import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: any) {
        if (value == null) return null;

        const hours = Math.floor(value / 60);
        const minutes = value % 60;

        const hoursString = hours.toString().padStart(2, '0');
        const minutesString = minutes.toString().padStart(2, '0');

        return `${hoursString}:${minutesString} `;
    }
}