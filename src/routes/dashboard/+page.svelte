<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
</script>

<Card.Root>
	<Card.Header class="px-7">
		<Card.Title>Orders</Card.Title>
		<Card.Description>Recent orders from your store.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Customer</Table.Head>
					<Table.Head class="hidden sm:table-cell">Type</Table.Head>
					<Table.Head class="hidden sm:table-cell">Status</Table.Head>
					<Table.Head class="hidden md:table-cell">Date</Table.Head>
					<Table.Head class="text-right">Amount</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row class="bg-accent">
					<Table.Cell>
						<div class="font-medium">Liam Johnson</div>
						<div class="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
					<Table.Cell class="text-right">$250.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Olivia Smith</div>
						<div class="hidden text-sm text-muted-foreground md:inline">olivia@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Refund</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="outline">Declined</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-24</Table.Cell>
					<Table.Cell class="text-right">$150.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Liam Johnson</div>
						<div class="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
					<Table.Cell class="text-right">$250.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Noah Williams</div>
						<div class="hidden text-sm text-muted-foreground md:inline">noah@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Subscription</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-25</Table.Cell>
					<Table.Cell class="text-right">$350.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Emma Brown</div>
						<div class="hidden text-sm text-muted-foreground md:inline">emma@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Subscription</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-26</Table.Cell>
					<Table.Cell class="text-right">$450.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Liam Johnson</div>
						<div class="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
					<Table.Cell class="text-right">$250.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Olivia Smith</div>
						<div class="hidden text-sm text-muted-foreground md:inline">olivia@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Refund</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="outline">Declined</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-24</Table.Cell>
					<Table.Cell class="text-right">$150.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Emma Brown</div>
						<div class="hidden text-sm text-muted-foreground md:inline">emma@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-26</Table.Cell>
					<Table.Cell class="text-right">$450.00</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
