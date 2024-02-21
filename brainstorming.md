# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware

## Telemetry

1) Upon observation, we can see that the format of JSON data received is incorrect sometimes, and hence causes the streaming service to crash. To counteract this, there are two approaches we can take:
- Identify, the corrupt data and then ignore it. This is a safety-based approach, as any incorrect form of data could threaten the security of the entire application.
- Correct the data received by removing the additional '}' received from the data-emulator.

Usually a situation like this would be handled by modifying the data emulator to ensure correct values are given. Hence, my approach is going to take the more data-driven pathway and remove the error from the data received and continue working.

Additionally, it seems like we are not using jsonData at the moment, so it would not be detrimental to remove it. But for the sake of future extensions and possible usage, we will leave jsonData in the codebase.

## Cloud