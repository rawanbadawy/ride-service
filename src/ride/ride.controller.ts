import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { CreateZoneDto } from './dto/create-zone.dto'; // Import the DTO

@Controller('rides')
export class RideController {
  constructor(private readonly rideService: RideService) { }

  // Create a ride
  @Post()
  async createRide(@Body() createRideDto: CreateRideDto) {
    return this.rideService.createRide(createRideDto);
  }

  // Get all rides
  @Get()
  async getRides() {
    return this.rideService.getRides();
  }

  // Get a ride by ID
  @Get(':id')
  async getRideById(@Param('id') id: string) {
    return this.rideService.getRideById(id);
  }

  // Update a ride
  @Patch(':id')
  async updateRide(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
    return this.rideService.updateRide(id, updateRideDto);
  }

  // Delete a ride
  @Delete(':id')
  async deleteRide(@Param('id') id: string) {
    return this.rideService.deleteRide(id);
  }

  // Search rides by destination and meeting point
  @Get('search')
  async searchRides(@Query('destination') destination: string, @Query('meetingPoint') meetingPoint: string) {
    return this.rideService.searchRides(destination, meetingPoint);
  }

  @Get('driver/:driverId')
  async getRidesByDriverId(@Param('driverId') driverId: string) {
    return this.rideService.getRidesByDriverId(driverId);
  }
}