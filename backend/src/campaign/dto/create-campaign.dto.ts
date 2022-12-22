import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty({
    description: 'The name of the campaign',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'The number of emails to send',
    minimum: 1,
    default: 100,
  })
  quantity: number;
}
