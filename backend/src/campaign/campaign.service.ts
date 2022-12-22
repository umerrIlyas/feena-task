import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Injectable()
export class CampaignService {
  constructor(@InjectQueue('campaign') private readonly campaignQueue: Queue) {}

  async create(createCampaignDto: CreateCampaignDto) {
    const job = await this.campaignQueue.add('campaign:emails', {
      data: createCampaignDto,
    });

    return {
      message: 'New campaign created successfully!',
      data: {
        job: job,
      },
    };
  }

  async findAll() {
    return (
      await this.campaignQueue.getJobs([
        'completed',
        'active',
        'waiting',
        'delayed',
        'failed',
        'paused',
      ])
    ).sort(
      (a: Job, b: Job) => parseInt(b.id as string) - parseInt(a.id as string),
    );
  }

  async remove(id: number) {
    return (await this.campaignQueue.getJob(id)).remove();
  }
}
