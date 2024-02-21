# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware

## Telemetry

### Task 1

Upon observation, we can see that the format of JSON data received is incorrect sometimes, and hence causes the streaming service to crash. To counteract this, there are two approaches we can take:
- Identify, the corrupt data and then ignore it. This is a safety-based approach, as any incorrect form of data could threaten the security of the entire application.
- Correct the data received by removing the additional '}' received from the data-emulator.

Usually a situation like this would be handled by modifying the data emulator to ensure correct values are given. Hence, my approach is going to take the more data-driven pathway and remove the error from the data received and continue working.

Additionally, it seems like we are not using jsonData at the moment, so it would not be detrimental to remove it. But for the sake of future extensions and possible usage, we will leave jsonData in the codebase.

### Task 2

In this scenario, we want to implement the most efficient method to record when 3 exceeding data readings have been observed within a span of 5 seconds.

One way to implement this, would be to store every data reading for a span of 5 seconds, which would result in an array of 10 elements (as the data-emulator transmits data every 500ms). But this method is highly inefficient for both time and space.

A better way to check for this condition would be to store the index of every occurance of an exceeding data reading in a list. This list would be updated under two conditions:
- An exceeding data value has been noted in the span of 5 seconds: In this case, we will add the index to the list.
- The span of 5 seconds since the first occurence of the list has passed: In this case, we will remove the first element from the list and subtract the removed value from the remaining items in the list.

These operations will guarantee the following functionality:
The list will always contain the indexes of occurences within a span of 5 seconds.

Using this, we can print an error message when the list size exceeds 3, ensuring an error condition.

## Cloud