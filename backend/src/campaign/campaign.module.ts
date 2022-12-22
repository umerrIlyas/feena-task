import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { BullModule } from '@nestjs/bull';
import { CampaignProcessor } from './campaign.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'campaign',
    }),
  ],
  controllers: [CampaignController],
  providers: [CampaignService, CampaignProcessor],
})
export class CampaignModule {}
